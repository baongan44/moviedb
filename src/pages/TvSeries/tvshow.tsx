import React from 'react'
import { category } from '../../api/api'
import MovieGrid from '../../components/movie-grid/MovieGrid'
import PageHeader from '../../components/page-header/PageHeader'

const Tvshow = () => {
  return (
    <>
      <PageHeader>
        Tv Show
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category.Tvshow} />
        </div>
      </div>
    </>
  )
}

export default Tvshow