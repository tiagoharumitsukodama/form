import { StyledForm } from './styled'
import { useState } from 'react'
import axios from 'axios'

import FormBoostrap from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Form({setErrMessage}) {

    const [inputNome, setInputNome] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputCEP, setInputCEP] = useState('')
    const [inputBairro, setInputBairro] = useState('')
    const [inputRua, setInputRua] = useState('')
    const [inputSenha, setInputSenha] = useState('')
    const [inputConfirmarSenha, setInputConfirmarSenha] = useState('')

    const handleButtonSend = e => {
        e.preventDefault()

        if(!inputNome || !inputEmail || !inputCEP || !inputBairro || !inputRua || !inputSenha){
            setErrMessage('Preencha todos os campos.')
            return
        }
        else if(inputSenha !== inputConfirmarSenha){
            setErrMessage('As senham não batem.')
            return
        }

        console.log(inputNome, inputEmail, inputCEP, inputBairro, inputRua, inputSenha)
    }


    const searchCEP = () => {
        axios.get(`https://viacep.com.br/ws/${inputCEP}/json/`)
        .then(res => {
            if(res.status === 200) return res
            else throw new Error('Não encontrou CEP informado')
        })
        .then(res => {
            const {bairro, logradouro} = res.data
            setInputBairro(bairro)
            setInputRua(logradouro)
        })
        .catch(err => console.log(err.message))
    }


    return <StyledForm>
            <h1>Cadastro</h1>
            <FormBoostrap>
                <FormBoostrap.Group className="mb-3">
                    <FormBoostrap.Control type="text" placeholder="Nome" onChange={e => setInputNome(e.target.value)} value={inputNome}/>
                </FormBoostrap.Group>

                <FormBoostrap.Group className="mb-3">
                    <FormBoostrap.Control type="email" placeholder="Email" onChange={e => setInputEmail(e.target.value)} value={inputEmail}/>
                </FormBoostrap.Group>

                <FormBoostrap.Group className="mb-3">
                    <FormBoostrap.Control type="text" placeholder="CEP" onChange={e => setInputCEP(e.target.value)} value={inputCEP}/>
                </FormBoostrap.Group>

                <FormBoostrap.Group className="mb-3">
                    <FormBoostrap.Control type="text" placeholder="Bairro" onInput={searchCEP} onChange={e => setInputBairro(e.target.value)} value={inputBairro}/>
                </FormBoostrap.Group>

                <FormBoostrap.Group className="mb-3">
                    <FormBoostrap.Control type="text" placeholder="Rua" onChange={e => setInputRua(e.target.value)} value={inputRua}/>
                </FormBoostrap.Group>

                <FormBoostrap.Group className="mb-3" controlId="formBasicPassword" >
                    <FormBoostrap.Control type="password" placeholder="Senha" onChange={e => setInputSenha(e.target.value)} value={inputSenha}/>
                </FormBoostrap.Group>

                <FormBoostrap.Group className="mb-3" controlId="formBasicPassword">
                    <FormBoostrap.Control type="password" placeholder="Confirmar senha" onChange={e => setInputConfirmarSenha(e.target.value)} value={inputConfirmarSenha}/>
                </FormBoostrap.Group>

                <Button variant="primary" type="submit" onClick={handleButtonSend}>
                    Pronto
                </Button>
            </FormBoostrap>
    </StyledForm>
}