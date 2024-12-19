import React from 'react';
import './App.css';
import './output.css';
import { DemoSharedButton, CatalystButton } from 'verticals-ui';
import { Button } from '@headlessui/react';

function App() {
  return (
    <>
      <div>Barracuda-UI</div>
      <div>
        <DemoSharedButton />
      </div>
      <div>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => alert('Default Tailwind button clicked!')}
        >
          Default Tailwind Headless UI Button with style from their docs
        </Button>
      </div>
      <div>
        <CatalystButton>Default Catalyst Button</CatalystButton>
      </div>
      <div>Some another div here</div>
    </>
  );
}
export default App;
