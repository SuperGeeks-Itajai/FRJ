export default function Navbar({ busca, setBusca }) {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">

        <span className="navbar-brand ms-auto">
          SuperGeeks Itajaí
        </span>

        <input
          className="form-control w-25"
          placeholder="Buscar Aulas"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>
    </nav>
  )
}