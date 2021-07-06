import { useState, useLayoutEffect } from 'react'
import paginationStyle from './index.module.css'

const Pagination = ({ limit, rows, callbackPagination, selected }) => {
  const [pages, setPages] = useState(null)
  const [pageSelect, setPageSelected] = useState(selected || 1)

  useLayoutEffect(() => {
    if (Math.round(rows / limit) >= rows / limit) {
      setPages(Math.round(rows / limit))
    } else {
      setPages(Math.round(rows / limit) + 1)
    }
  }, [])

  const handlePages = e => {
    setPageSelected(e.target.id)
    callbackPagination && callbackPagination(e)
  }

  return (
    <section className={paginationStyle.containerPagination}>
      {pages &&
        Array(pages)
          .fill()
          .map((_, index) => {
            const isSelected = +pageSelect === index + 1

            return (
              <>
                <small
                  className={`${paginationStyle.paginationItens} ${isSelected && paginationStyle.selected }`}
                  id={index + 1}
                  data-actual={index + 1}
                  onClick={handlePages}
                  key={index}
                >
                  {index + 1}
                </small>
              </>
            )
          })}
    </section>
  )
}

export default Pagination
