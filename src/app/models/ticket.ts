export interface Ticket {
    id: string;

    // para simplificar, se empleará "new Date().toISOString()"
    date: string;
    hour: string;

    quantities: {
        ADULT: number;
        CHILD: number;
        SENIOR: number;
    };
    total: number;
    // para evitar complicaciones en el futuro, agregar estos campos opcionales
    //   isMember: boolean;
    //   discountApplied?: number;    
}