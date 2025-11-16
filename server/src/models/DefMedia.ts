export type Grade = 'MANA' | 'MPA' | 'MA';
type Meta = string;

export class DefMedia {
    private readonly conceito_peso: Map<Grade, number>; // MA, MPA, MANA
    private readonly meta_peso: Map<Meta, number>; // "Gerência de Configuração", "Gerência de Projeto", etc.
    private readonly somaPesosMeta: number;

    constructor(conceitoPesoInicial: Record<Grade, number>, metaPesoInicial: Record<Meta, number>) 
    {
        // congela os maps depois de criados
        this.conceito_peso = new Map(Object.entries(conceitoPesoInicial) as [Grade, number][]);
        this.meta_peso = new Map(Object.entries(metaPesoInicial) as [Meta, number][]);

        // pré-computa a soma dos pesos das metas (denominador)
        this.somaPesosMeta = Object.values(metaPesoInicial).reduce((acc, v) => acc + v, 0);

        if (this.somaPesosMeta === 0)
            throw new Error("A soma dos pesos das metas não pode ser zero.");
    }

    /**
     * Calcula a média ponderada das notas do aluno.
     * @param metaNotas Map com as metas e as notas alcançadas.
     * @returns A média ponderada como número.
    */
    calc(metaNotas: Map<Meta, Grade>): number 
    {
        let somaTotal = 0;

        for (const [meta, conceito] of metaNotas.entries()) 
        {
            const pesoConceito = this.conceito_peso.get(conceito)!;
            const pesoMeta = this.meta_peso.get(meta)!;
            somaTotal += pesoMeta * pesoConceito;
        }

        return somaTotal / this.somaPesosMeta;
    }
}
