const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div>
      <div className="foot-fixed-extra"></div>
      <footer>
        <p> ⓒ dubeyTech {year}. </p>
      </footer>
    </div>

  )
}
export default Footer