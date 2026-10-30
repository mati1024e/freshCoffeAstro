import { useOrderStore } from '@/stores/order'
import { actions, isActionError, isInputError } from 'astro:actions'
import { navigate } from 'astro:transitions/client'
import type {SubmitEvent} from 'react'
import { toast } from 'react-toastify'

function SubmitOrderForm() {
  const  { order} =  useOrderStore()
  const handleSubmit = async (evt:SubmitEvent)=>{
    evt.preventDefault()
    const form = evt.target as HTMLFormElement
    const formData = new FormData(form)
    const name =  formData.get('name')?.toString() ?? ''

    const{data,error} =await actions.orders.createOrder({name,order})
    const actionError = isActionError(error) ? error.message : null

    if(actionError){
      toast.error(actionError)
      return
    }

    const inputError = isInputError(error) ? error.issues :[]
    if(error && inputError.length){
      inputError.forEach(error => toast.error(error.message))
      return
    }
    if(data && !error){
      toast.success(data.message)
      await actions.auth.signOut()
      setTimeout(()=>{
        navigate('/')
      },5000)
    }
    
  }

  return (
    <form className="mt-5" onSubmit={ handleSubmit}>
      <div className="space-y-3">
        <label htmlFor="name" className="font-bold text-lg">
          Tu Nombre:
        </label>

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Coloca tu Nombre"
          className="border border-gray-300 p-2 w-full rounded-xl"
        />
      </div>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white w-full rounded-xl py-3 mt-5 text-lg font-bold uppercase cursor-pointer"
        type="submit"
      >
        Realizar Pedido
      </button>
    </form>
  );
}
export default SubmitOrderForm;
