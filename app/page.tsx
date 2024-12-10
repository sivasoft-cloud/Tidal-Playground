import { ApiPlayground } from './components/ApiPlayground'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Tidal API Playground</h1>
      <ApiPlayground />
    </div>
  )
}

