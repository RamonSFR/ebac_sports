import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootReducer } from '..'

type Produto = {
  id: number
  nome: string
}

type FavoritosState = {
  itens: Produto[]
}

const initialState: FavoritosState = {
  itens: []
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    favoritar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      const estaFavoritado = state.itens.find((p) => p.id === produto.id)

      if (estaFavoritado) {
        state.itens = state.itens.filter((p) => p.id !== produto.id)
      } else {
        state.itens.push(produto)
      }
    }
  }
})

export const { favoritar } = favoritosSlice.actions
export default favoritosSlice.reducer
export const selectEstaFavoritado = (state: RootReducer, produtoId: number) =>
  state.favoritos.itens.some((p) => p.id === produtoId)
