import React from 'react';
import { Button } from '../catalyst/typescript/button';

export function DemoSharedButton(): JSX.Element {
  return (
    <div>
      <Button color="cyan" onClick={() => alert('Shared button component!')}>
        Catalyst Custom Styled Shared Button Component
      </Button>
    </div>
  );
}
