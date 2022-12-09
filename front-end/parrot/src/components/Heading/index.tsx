import { ReactNode } from 'react';
import { Slot } from "@radix-ui/react-slot"; // Mescla seus adereços em seu filho imediato.
import { clsx } from 'clsx'; //cria um seletor css com comportamento dinâmico. é uma definição de classe dinâmica.

//componente genérico e reutilizável de cabeçalho
//interface é uma palavra chave do typescript que é um objeto.
//a ? diz que o atrributo é opcional.
export interface HeadingProps {
    size?: "sm" | "md" | "lg";
    children: ReactNode; //variável própria do react. ela vai ser tudo que tiver dentro do componente.
    asChild?: boolean; //determina se o filho vai ser determinado como o pai ou não.
    className?: string;
}

function Heading({

    size = 'md',
    children,
    asChild,
    className,
}: HeadingProps) {
    const Comp = asChild ? Slot : "h2";

    return (
        <Comp
            className={clsx(
                //parâmetro 1 - definição padrão para todos
                "text-gray-100 font-sans font-bold",
                //parâmetro 2 - condicionais
                {
                    "text-lg": size === "sm",
                    "text-xl": size === "md",
                    "text-2xl": size === "lg",
                },
                //parâmetro 3 - receber o className
                className
            )}
        >
            {children}
        </Comp>
    );
}

export default Heading;