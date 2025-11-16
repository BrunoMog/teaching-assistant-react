export type Grade = 'MANA' | 'MPA' | 'MA';
type Meta = string;

export interface DefMedia {
    conceitoPeso: Map<Grade, number>;
    metaPeso: Map<Meta, number>;
}

export const DEFAULT_DEFMEDIA: DefMedia = {
    conceitoPeso: new Map<Grade, number>([
        ['MA', 10],
        ['MPA', 7],
        ['MANA', 4],
    ]),
    metaPeso: new Map<Meta, number>(),
};