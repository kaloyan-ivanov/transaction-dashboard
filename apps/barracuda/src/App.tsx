import React from 'react';
import './App.css';
import './output.css';
import { DemoSharedButton, Button, addNumbers } from 'verticals-ui';
import { Button as HeadlessButton } from '@headlessui/react';

function App() {
  return (
    <>
      <div>Barracuda-UI</div>
      <div>
        <DemoSharedButton />
      </div>
      <div>
        <HeadlessButton
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => alert('Default Tailwind button clicked!')}
        >
          Default Tailwind Headless UI Button with style from their docs
        </HeadlessButton>
      </div>
      <div>
        <Button>Default Catalyst Button</Button>
      </div>
      <div>{`Some another div here that uses to calculate via shared helper functions 2+2 -> ${addNumbers(2, 2)}`}</div>
    </>
  );
}
export default App;
