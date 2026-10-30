import { verifySession } from "@/api/services/dal";
import { OrderItemSchema } from "@/types/orders.schema";
import { calculateTota, formatOrder } from "@/utils";
import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";

export const orders = {
  createOrder: defineAction({
    accept: "json",
    input: z.object({
      name: z.string().min(1, { error: "El nombre es obligatorio" }),
      order: z.array(OrderItemSchema),
    }),
    handler: async (input, ctx) => {
      const token = ctx.cookies.get("FRESHCOFFEE_TOKEN")?.value!;

    //   if (!token) return;
    //   const { user } = await verifySession(token);

    //   if (!user) {
    //     throw new ActionError({
    //       message: "Hubo un error al realizar la orden",
    //       code: "BAD_REQUEST",
    //     });
    //   }

      const content = formatOrder(input.order);
      const total = calculateTota(input.order);

      const res = await fetch(`${import.meta.env.API_URL}/freshcoffee_order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Orden de: ${input.name}`,
          content,
          status: "publish",
          acf: {
            total,
            status: "pending",
            name: input.name,
          },
        }),
      });
      const { id }: { id: number } = await res.json();
      return {
        message: `Orden Creada Correctamente ${id}`,
      };
    },
  }),
  updateStatus: defineAction({
    accept: "json",
    input: z.object({
      status: z.string(),
      id: z.number(),
    }),
    handler: async (input, ctx) => {
        if(ctx.locals.user.role !== 'administrator'){
            throw new ActionError({
                message:'Hubo un error al actualizar la orden',
                code: 'BAD_REQUEST'
            })
        }
        const token =  ctx.cookies.get('FRESHCOFFEE_TOKEN')?.value!
        const url = `${import.meta.env.API_URL}/freshcoffee_order/${input.id}`
        const res = await fetch(url,{
            method:'PUT',
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({
                acf:{
                    status: input.status
                }
            })
        })
         await res.json()
        // console.log(data)
        return {
            message: 'Actualizado  Correctamente'
        }

    },
  }),
};
