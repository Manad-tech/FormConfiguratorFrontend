

const ResponsesPage = () => {

  const responses = JSON.parse(localStorage.getItem('responses') || '[]')

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl mb-4">Responses</h1>

      {responses.map((res , i) => (
        <pre key={i} className="bg-white/10 p-3 rounded mb-2">
          {JSON.stringify(res , null, 2)}
        </pre>
      ))}
      
    </div>
  )
}

export default ResponsesPage
