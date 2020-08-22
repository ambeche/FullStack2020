import React from 'react'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <>
      {country.data.map( (data, i) => 
        <div key={i}>
          <h3>{data.name} </h3>
        <div>capital {data.capital} </div>
        <div>population {data.population}</div> 
        <img src={data.flag} height='100' alt={`flag of ${data.name}`}/>
        </div> 
      )}
    </>
  )
}

export default Country