import { StaticCeloProvider } from '@celo-tools/celo-ethers-wrapper'; // TODO: Update this to an SDK for your source chain
import { providers } from 'ethers';

export async function fetchBlock(
  endpoint: string,
  height: number
): Promise<any> {
  
  // TODO: Update line below to connect to appropriate SDK
  const provider = new StaticCeloProvider(endpoint);
  // TODO: Update line below to get data from the appropriate RPC endpoint
  const block = await provider.getBlockWithTransactions(height);

  // The block is always defined, unless the height is out of range.
  if (block) {
   // TODO: Implement post-processing of the data that comes back
  }

  return block;
}
