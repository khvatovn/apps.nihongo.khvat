import React, { ReactNode, ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProviderTuple = [ComponentType<any>, any?] | ComponentType<any>;

interface ProvidersProps {
  providers: ProviderTuple[];
  children: ReactNode;
}

export const Providers = ({ providers, children }: ProvidersProps) => {
  return providers.reduceRight((acc, provider) => {
    if (Array.isArray(provider)) {
      const [ProviderComponent, props] = provider;
      return <ProviderComponent {...props}>{acc}</ProviderComponent>;
    }
    const ProviderComponent = provider;
    return <ProviderComponent>{acc}</ProviderComponent>;
  }, children as ReactNode);
};
