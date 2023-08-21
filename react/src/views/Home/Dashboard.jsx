import { useEffect, useState } from "react";
import axiosClient from '../../axios-client'

export default function Dashboard() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = () => {
    setLoading(true)
    axiosClient.get(`/products?page=${page}`)
      .then(({ data }) => {
        console.log(data);
        setLoading(false)
        setProducts(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>List Products</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>SKU</th>
              <th>Description</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="4" class="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.SKU}</td>
                  <td>{p.description}</td>
                </tr>
              ))}
            </tbody>
          }
        </table>

        <div className="pagination">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <button
                disabled={page === 1}
                onClick={() => setPage((prevState) => prevState - 1)}
              >
                Prev
              </button>
              <p>{page}</p>
              <button onClick={() => setPage((prevState) => prevState + 1)}>
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
