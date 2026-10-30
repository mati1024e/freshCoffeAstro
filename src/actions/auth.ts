import { guestCredentials } from "@/api/services/dal";
import { loginUser, loginUserWithParams } from "@/api/services/serviceAuth";
import { nullToEmptyString } from "@/utils";
import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";

export const auth = {
  signInAsGuest: defineAction({
    handler: async (input, ctx) => {
      const data = await loginUser();

      //Context
      ctx.cookies.set("FRESHCOFFEE_TOKEN", data.token, {
        httpOnly: true, //=> hace que no puedas acceder la cookie medientes JS
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 1,
      });

      return true;
    },
  }),

  signIn: defineAction({
    accept: "form",
    input: z.object({
      username: z.preprocess(
        nullToEmptyString,
        z.string().min(1, { error: "El usuario no puede ir vacio" }),
      ),
      password: z.preprocess(
        nullToEmptyString,
        z.string().min(1, { error: "El password no puede ir vacio" }),
      ),
    }),
    handler: async (input, ctx) => {
      const res = await loginUserWithParams(input);
      if (res.code === "[jwt_auth] invalid_username") {
        throw new ActionError({
          message: "El usuario no existe",
          code: "UNAUTHORIZED",
        });
      }
      if (res.code === "[jwt_auth] incorrect_password") {
        throw new ActionError({
          message: "El Password es incorrecto",
          code: "UNAUTHORIZED",
        });
      }

      ctx.cookies.set("FRESHCOFFEE_TOKEN", res.token, {
        httpOnly: true, //=> hace que no puedas acceder la cookie medientes JS
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 1,
      });
      return true;
    },
  }),

  signOut: defineAction({
    handler: (_, ctx) => {
      ctx.cookies.delete("FRESHCOFFEE_TOKEN", {
        path: "/",
      });
    },
  }),
};
