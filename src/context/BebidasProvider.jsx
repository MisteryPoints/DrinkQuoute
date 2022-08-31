import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BebidasContext = createContext()

const BebidasProvider = ({children}) => { 
    const [bebidas, setBebidas] = useState([])
    const [modal, setModal] = useState(false)
    const [bebidaID, setBebidaID] = useState(null)
    const [receta, setReceta] = useState({})

    useEffect(() => {
        const getReceta = async () => {
            if(!bebidaID) return
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaID}`
                const {data} = await axios(url)
                setReceta(data.drinks[0])

            } catch (error) {
                console.log(error)
            }
        }
        getReceta()
    }, [bebidaID])

    const getBebidas = async datas => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datas.nombre}&c=${datas.categoria}`
            const { data } = await axios(url) 
            setBebidas(data.drinks)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalClick = () => {
        setModal(!modal)
    }

    const handleBebidaIDClick = id => {
        setBebidaID(id)
    }
 
    return(
        <BebidasContext.Provider value={{
            getBebidas,
            bebidas,
            handleModalClick,
            modal,
            handleBebidaIDClick,
            receta
        }}>
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext