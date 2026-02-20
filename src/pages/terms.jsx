import { Link } from 'react-router-dom'

const TermsPage = () => (
  <div className="container mx-auto max-w-2xl py-12 px-4">
    <h1 className="text-2xl font-bold mb-4">Termos de uso</h1>
    <p className="text-muted-foreground mb-6">
      Conteúdo dos termos de uso a ser definido.
    </p>
    <Link to="/signup" className="text-primary hover:underline">
      Voltar ao cadastro
    </Link>
  </div>
)

export default TermsPage
