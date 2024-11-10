import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import PercentageControl from './percentageControl';
import percentageControlTester from './percentageControlTester';
import schema from './schema.json';
import uiSchema from './uiSchema.json';
import initialData from './data.json';
import './App.css';

// Ajout du renderer personnalisé
const renderers = [
  ...materialRenderers,
  { tester: percentageControlTester, renderer: PercentageControl },
];

function App() {
  const [data, setData] = useState(initialData);

  // Mise à jour des données du formulaire
  const handleChange = ({ data }: { data: any }) => setData(data);

  // Validation du total des pourcentages
  const isPercentageValid = (data: any) =>
    data.countries.reduce((acc: number, country: { percentage: number }) => acc + (country.percentage || 0), 0) === 100;

  return (
    <div className="app-container">
      <header className="app-header">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Formulaire de Répartition par Pays</h1>
      </header>

      <main>
        <JsonForms
          schema={schema}
          uischema={uiSchema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={handleChange}
        />
        {!isPercentageValid(data) && (
          <p className="error-message">La somme des pourcentages doit être égale à 100%.</p>
        )}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  );
}

export default App;
