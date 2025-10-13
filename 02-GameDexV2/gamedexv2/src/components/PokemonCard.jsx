// JSX
export default function PokemonCard({ id, name, image }) {
  return (
    <article className="card">
      <img src={image} alt={name} width="96" height="96" loading="lazy" />
      <div className="card-name" title={name}>
        {name}
      </div>
      <div className="card-id">#{id}</div>
    </article>
  );
}
