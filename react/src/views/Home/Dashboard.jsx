import { useEffect, useState } from "react";
import axiosClient from '../../axios-client'
import ReactPaginate from 'react-paginate';

export default function Dashboard() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage])

  const getProducts = () => {
    console.log('current :', currentPage);
    setLoading(true)
    axiosClient.get(`/products?page=${currentPage}`)
      .then(({ data }) => {
        setLoading(false)
        setProducts(data.data)
        // console.log(data);
        setPageCount(data.meta.last_page)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handlePageChange = ({ selected }) => {
    // console.log(selected + 1);
    setcurrentPage(selected + 1);
  };

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
                <td colSpan="4" className="text-center">
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

        {!loading && products.length != 0 &&
          <ReactPaginate

            pageCount={pageCount}
            onPageChange={handlePageChange}
            // forcePage={currentPage}
            containerClassName={'pagination'}
            // previousLinkClassName={'page'}
            // breakClassName={'page'}
            // nextLinkClassName={'page'}
            // pageClassName={'page'}
            // disabledClassNae={'disabled'}
            activeClassName={'active'}
          />
        }

      </div>
    </div>
  )
}
