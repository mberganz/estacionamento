import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from '../services/api';

const ListParks: React.FC = () => {
  const [parks, setParks] = useState<{ id: string, number: number, open: boolean, preferencial: boolean }[]>([]);
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [preferencial, setPreferencial] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getParks();
  }, [])

  const createPark = async () => {
    if (!number) {
      toast.error('Forneça um número de vaga')
    }

    try {
      const response = await axios.post('/park', {
        park: {
          number,
          preferencial,
          open,
        }
      });
      console.log(response)
    } catch (err) {
      toast.error('Numero de vaga já existe')
    }
  }

  const getParks = async () => {
    setTimeout(() => getParks(), 3000)
    try {
      const response = await axios.get('/parks')
      setParks(response.data)
    } catch (err) {
      toast.error('Erro ao listar vagas')
    }
  }

  return (
    <div className="container">
      <div className='card'>
        <div className='card-body shadow'>
          <h1 className="card-title">Adicionar vaga</h1>
            <div className='input-group mb-3 flex-nowrap'>
              <span style={{marginRight: 10, marginTop: 10}}>Numero </span>
              <input className='form-control' type="number" min={0} value={number} onChange={e => setNumber(Number(e.target.value))} /> <br />
            </div>
            <div className='input-group mb-3 flex-nowrap'>  
              <span style={{marginRight: 10}}>Preferencial </span>
              <input className='form-check-input mt-0' type="checkbox" checked={preferencial} onChange={e => setPreferencial(!preferencial)} /> <br />
            </div>
            <div className='input-group mb-3 flex-nowrap'>
               <span style={{marginRight: 10}}>Aberta </span>
              <input className='form-check-input mt-0' type="checkbox" checked={open} onChange={e => setOpen(!open)} /> <br />
            </div>
            <div className='input-group mb-3 flex-nowrap'>
              <button className='btn btn-primary shadow' type="button" onClick={createPark}>Criar vaga</button>
            </div>         
            <div className="card shadow-sm scroll" style={{maxHeight: '500px', overflowY: 'auto'}}>
              <div className='card-body shadow'>
                <h1 className="card-title">Lista de vagas</h1>
                {parks.map(park => (
                  <>  
                    <hr />             
                    <div  style={{ display: 'flex', flexDirection: 'column', maxWidth: '250px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                      <span>Numero: {park.number}</span>
                      <span>É preferencial: <span style={{ color: park.preferencial ? 'green' : 'red' }}>{park.preferencial ? 'Sim' : 'Não'}</span></span>
                      <span>Status: <span style={{ color: park.open ? 'green' : 'red' }}>{park.open ? 'Aberta' : 'Fechada'}</span></span>                    
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
    
  )
}

export { ListParks }