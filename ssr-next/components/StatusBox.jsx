function StatusBox({ title, description }) {
  return (
    <section className="status-box" aria-live="polite">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}

export default StatusBox

