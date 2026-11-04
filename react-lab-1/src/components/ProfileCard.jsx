import { useState } from 'react'

function ProfileCard({ name, group, technologies }) {
  const [likes, setLikes] = useState(0)

  return (
    <section className="profile-card" aria-labelledby="profile-title">
      <h1 id="profile-title">Про мене</h1>
      <p className="profile-card__detail">
        <strong>Ім’я:</strong> {name}
      </p>
      <p className="profile-card__detail">
        <strong>Група:</strong> {group}
      </p>
      <h2>Технології, які хочу опанувати</h2>
      <ul className="profile-card__technologies">
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <button
        className="profile-card__like-button"
        type="button"
        onClick={() => setLikes((count) => count + 1)}
      >
        Подобається ({likes})
      </button>
    </section>
  )
}

export default ProfileCard
