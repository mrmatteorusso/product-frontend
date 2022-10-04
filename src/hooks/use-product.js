import { useQuery, useMutation } from '@tanstack/react-query'

const baseURL = 'https://scandiweb-be.herokuapp.com'
// const baseURL = ''

export const useProduct = () => {
  const {
    data: list,
    refetch: refetchList,
    isLoading,
    isError,
    error,
  } = useQuery(['product.list'], () => {
    return fetch(baseURL + '/products')
      .then(async (response) => {
        const data = await response.json()

        return data
      })
      .then((data) => {
        //not needed
        return data
      })
  })
  const create = useMutation((params) => {
    return fetch(baseURL + '/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
      .then(async (response) => {
        const data = await response.json()
        if (response.status > 299 || response.status < 200) {
          throw data.data
        }

        //QueryClient.invalidateQueries(['product.list'])
        return data
      })
      .then((data) => data.data) //not needed
  })

  const deleteIds = useMutation(async (arrayOfIds) => {
    // return fetch(baseURL + '/products/delete', {
    return fetch(`https://scandiweb-be.herokuapp.com/products/delete`, {
      // mode: 'no-cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: arrayOfIds }),
    })
      .then(async (response) => await response.json())
      .then((data) => data.data)
  })

  return {
    isLoading,
    isError,
    error,
    refetchList,
    list,
    create,
    deleteIds,
  }
}
