import { useState, useLayoutEffect } from 'react'

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
    <>
      {pages &&
        Array(pages)
          .fill()
          .map((_, index) => {
            return (
              <>
                <span
                  id={index + 1}
                  data-actual={index + 1}
                  style={{
                    background: +pageSelect === index + 1 ? '#f0f' : '#fff',
                    border: '1px solid #f0f',
                  }}
                  onClick={handlePages}
                  key={index}
                >
                  {index + 1}
                </span>
              </>
            )
          })}
    </>
  )
}

export default Pagination
