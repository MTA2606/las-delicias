
import React from 'react';

export default function Nosotros() {
  return (
    <div className="container py-5">

      {/* Presentación */}
      <div className="text-center mb-5">
        <p className="text-danger fw-bold text-uppercase mb-2">
          Conoce nuestra esencia
        </p>

        

        <p className="lead text-secondary">
          Restaurante Las Delicias: buena comida, mejores momentos.
        </p>
      </div>

      {/* Historia e imagen */}
      <div className="row align-items-center g-4 mb-5">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80"
            alt="Ambiente acogedor de un restaurante"
            className="img-fluid rounded-4 shadow"
          />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold mb-3">
            Nuestra historia
          </h2>

          <p>
            Restaurante Las Delicias nació en el año 2018,
            gracias al sueño de Alejandro Mendoza, un apasionado
            de la gastronomía que quería crear un lugar donde
            las personas pudieran disfrutar de buena comida
            y compartir momentos inolvidables.
          </p>

          <p>
            Lo que comenzó como un pequeño proyecto familiar
            se convirtió en un restaurante pensado para reunir
            a amigos, parejas y familias alrededor de la mesa.
            Desde nuestros inicios, nuestra prioridad ha sido
            ofrecer sabor, calidad y una atención cercana.
          </p>

          <p className="mb-0">
            Hoy seguimos trabajando con la misma ilusión:
            convertir cada visita en una experiencia especial.
          </p>
        </div>
      </div>

      {/* Fundador */}
      <div className="bg-light rounded-4 p-4 p-md-5 mb-5">
        <div className="row align-items-center g-4">
          <div className="col-md-4 text-center">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
              alt="Chef profesional en una cocina"
              className="img-fluid rounded-circle shadow"
              style={{
                width: '220px',
                height: '220px',
                objectFit: 'cover'
              }}
            />
          </div>

          <div className="col-md-8">
            <p className="text-danger fw-bold text-uppercase mb-2">
              La persona detrás del sueño
            </p>

            <h2 className="fw-bold">
              Nuestro fundador
            </h2>

            <h5 className="text-secondary mb-3">
              Alejandro Mendoza
            </h5>

            <p>
              Desde joven, Alejandro encontró en la cocina
              una forma de expresar creatividad, cariño y
              tradición. Su sueño era reunir diferentes sabores
              en un solo lugar y hacer que cada persona se
              sintiera bienvenida.
            </p>

            <p className="mb-0">
              Su visión continúa inspirando nuestro trabajo:
              preparar cada plato con dedicación y atender
              a nuestros visitantes como si estuvieran en casa.
            </p>
          </div>
        </div>
      </div>

      {/* Especialidades */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            Un mundo de sabores
          </h2>

          <p className="text-secondary">
            Nos inspira la riqueza de distintas culturas
            gastronómicas.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
                className="card-img-top"
                alt="Plato de gastronomía peruana"
                style={{ height: '190px', objectFit: 'cover' }}
              />

              <div className="card-body text-center">
                <h5 className="card-title fw-bold">
                  Cocina peruana
                </h5>

                <p className="card-text">
                  Sabores tradicionales, ingredientes frescos
                  y recetas llenas de identidad.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80"
                className="card-img-top"
                alt="Pasta de inspiración italiana"
                style={{ height: '190px', objectFit: 'cover' }}
              />

              <div className="card-body text-center">
                <h5 className="card-title fw-bold">
                  Cocina italiana
                </h5>

                <p className="card-text">
                  Pastas y combinaciones que celebran
                  la sencillez y el buen sabor.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=600&q=80"
                className="card-img-top"
                alt="Comida de inspiración mexicana"
                style={{ height: '190px', objectFit: 'cover' }}
              />

              <div className="card-body text-center">
                <h5 className="card-title fw-bold">
                  Cocina mexicana
                </h5>

                <p className="card-text">
                  Colores, aromas y sabores intensos
                  para disfrutar en cada bocado.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
                className="card-img-top"
                alt="Plato de cocina internacional"
                style={{ height: '190px', objectFit: 'cover' }}
              />

              <div className="card-body text-center">
                <h5 className="card-title fw-bold">
                  Cocina internacional
                </h5>

                <p className="card-text">
                  Propuestas variadas para descubrir
                  nuevos sabores y combinaciones.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Valores */}
      <div className="row g-4 mb-5 text-center">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-4">
            <h4 className="fw-bold">Calidad</h4>

            <p className="mb-0">
              Elegimos cuidadosamente nuestros ingredientes
              y cuidamos cada preparación.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-4">
            <h4 className="fw-bold">Hospitalidad</h4>

            <p className="mb-0">
              Queremos que cada visitante se sienta
              cómodo, bienvenido y atendido.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-4">
            <h4 className="fw-bold">Pasión</h4>

            <p className="mb-0">
              Ponemos dedicación y cariño en cada plato
              y en cada experiencia.
            </p>
          </div>
        </div>
      </div>

      {/* Filosofía */}
      <div className="bg-danger text-white text-center rounded-4 p-4 p-md-5 mb-5">
        <h2 className="fw-bold mb-3">
          Nuestra filosofía
        </h2>

        <blockquote className="blockquote mb-3">
          <p className="fs-4 fst-italic">
            «La buena comida alimenta el cuerpo,
            pero los momentos compartidos alimentan el alma».
          </p>
        </blockquote>

        <p className="mb-0">
          Restaurante Las Delicias — más que comida,
          momentos para recordar.
        </p>
      </div>

      
    </div>
  );
}
