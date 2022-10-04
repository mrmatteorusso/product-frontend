import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../hooks/use-product'

//const baseURL = 'http://localhost:8889'

function Attributes(props) {
  let atts = JSON.parse(props.attributes)

  return (
    <>
      {Object.keys(atts).map((key, i) => (
        <div key={i}>
          {key}: {atts[key].value} {atts[key].unit}
        </div>
      ))}
    </>
  )
}

const Products = () => {
  const navigate = useNavigate()
  const product = useProduct()
  // if (product.isLoading) {
  //   return <div>Is loading</div>
  // }

  if (product.isError) {
    return <div>Error Found, please refresh the page</div>
  }

  const executeMassDelete = () => {
    const allTheCheckboxes = Array.from(
      document.querySelectorAll("input[type='checkbox']")
    )
    const allCheckedCheckboxes = allTheCheckboxes.filter(
      (item) => item.checked === true
    )
    const allIdsToDelete = allCheckedCheckboxes.map((item) =>
      Number.parseInt(item.id.replace('item-', ''))
    )

    product.deleteIds.mutate(allIdsToDelete, {
      onSuccess() {
        product.refetchList()
      },
    })
  }

  return (
    <div>
      <div className="container main">
        <div className="container head">
          <div className="row  mt-5">
            <div className="col-md-8">
              <div className="header">
                <h1 className="border-bottom border-secondary border-3">
                  Product List
                </h1>
              </div>
            </div>
            <div className="col-md-4">
              <button
                type="button"
                className="btn btn-primary p-3 m-1"
                onClick={() => {
                  navigate('/addproduct')
                }}
              >
                ADD
              </button>

              <button
                id="delete-product-btn"
                form="products_form"
                className="btn btn-danger p-3 m-1"
                onClick={executeMassDelete}
              >
                MASS DELETE
              </button>
            </div>
          </div>
        </div>
        <form id="product_form" action="#" method="POST">
          <div className="container">
            <div className="row mt-3">
              {product && product?.list?.data.map((product) => (
                <div className="col-md-3 mb-5" key={product.id}>
                  <div className="card h-100">
                    <div className="card-body">
                      <input
                        type="checkbox"
                        className="delete-checkbox"
                        name={product.name}
                        id={'item-' + product.id}
                      />
                      <div className="container text-center">
                        <div>
                          <h4 className="card-title">{product.name}</h4>
                          <p className="card-text">{product.price} $</p>
                          <p className="card-text">{product.type}</p>
                          <div className="card-text">
                            {' '}
                            <Attributes attributes={product.attributes} />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Products
