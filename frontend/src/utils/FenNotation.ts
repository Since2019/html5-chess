

class FenNotation {
    piece_placement: string;
    active_color: string;
    castling_availability: string;
    en_passant_end_coordinate: string;
    half_move_counter: number;
    full_move_counter: number;

    // 
    constructor(
        piece_placement: string,
        active_color: string,
        // castling_availability: string = '-',          // 中象中不存在castling，所以一直都是 "-"
        // en_passant_end_coordinate: string = '-',      // 中象中不存在en passant，所以一直都是"-""
        half_move_counter: number,
        full_move_counter: number
    ) {
        this.piece_placement = piece_placement;                          // rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR
        this.active_color = active_color;                                // w
        this.castling_availability = '-';                                // -
        this.en_passant_end_coordinate = '-';                            // -
        this.half_move_counter = half_move_counter;                      // 通常该值达到120就要判和(六十回合自然限着)，一旦形成局面的上一步是吃子，这里就标记“0”
        this.full_move_counter = full_move_counter;                      // 
    }

    public getFenNotation(): string {
        // let ret_string = `${this.piece_placement} ${this.active_color} ${this.castling_availability} ${this.en_passant_end_coordinate} ${this.half_move_counter} ${this.full_move_counter}`;
        let ret_string = `${this.piece_placement} ${this.active_color} ${this.castling_availability} ${this.en_passant_end_coordinate} ${this.half_move_counter} 1`;

        return ret_string;
    }



}

export {
    FenNotation
}