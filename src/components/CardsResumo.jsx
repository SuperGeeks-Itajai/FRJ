export default function CardsResumo({ modulos, aulas }) {
  const totalModulos = modulos.length
  const totalAulas = aulas.length

  const aulasSemDescricao = aulas.filter(a => !a.descricao).length

  return (
    <div className="row mb-4">

      <Card titulo="Módulos" valor={totalModulos} />
      <Card titulo="Aulas" valor={totalAulas} />
      <Card titulo="Sem descrição" valor={aulasSemDescricao} />

    </div>
  )
}

function Card({ titulo, valor }) {
  return (
    <div className="col-md-4">
      <div className="card bg-black text-white border-white">
        <div className="card-body">
          <h6 className="text-white text-uppercase small">{titulo}</h6>
          <h2 className="text-danger">{valor}</h2>
        </div>
      </div>
    </div>
  )
}