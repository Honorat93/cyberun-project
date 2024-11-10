import { rankWith, scopeEndsWith } from '@jsonforms/core';

export default rankWith(
  2,  
  scopeEndsWith('percentage')
);
