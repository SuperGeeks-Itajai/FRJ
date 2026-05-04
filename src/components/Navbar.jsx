export default function Navbar({ busca, setBusca }) {
  return (
    <nav className="navbar navbar-dark bg-black fixed-top">
      <div className="container-fluid d-flex justify-content-between">
        {/* BOTÃO MENU */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* TÍTULO */}
        <span className="navbar-brand ms-auto text-danger">SuperGeeks Itajaí</span>

        {/* OFFCANVAS */}
        <div
          className="offcanvas offcanvas-start bg-black text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">
            {/* MENU */}
            <ul className="navbar-nav flex-grow-1 pe-3">
              <li className="nav-item">
                <button className="nav-link btn btn-link text-start text-white">
                  Dashboard
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link btn btn-link text-start text-white">
                  Módulos
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link btn btn-link text-start text-white">
                  Aulas
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link btn btn-link text-start text-white">
                  Relatórios
                </button>
              </li>
            </ul>

            {/* BUSCA */}
            <div className="d-flex mt-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar Aulas"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
