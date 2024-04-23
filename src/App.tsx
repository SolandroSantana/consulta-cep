import { ModeToggle } from '@/components/mode-toggle'
import './globals.css'
import { AddressForm } from './components/address-form'

function App() {

  return (
    <>
      <div className='p-5'>
        <ModeToggle />
        <h1 className='text-5xl text-center'>Consulta CEP</h1>
        <div className='grid grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-3 p-5'>
          <AddressForm />
        </div>
      </div>

    </>
  )
}

export default App
