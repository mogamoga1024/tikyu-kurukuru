
const 世界地図の文字列 =
`                                                                                                                                                            ########          ##########      
                ####                                        ##                                                                                        ########    ########################    
                                            ############################################                                                ########    ##  ##########        ##############      
              ####  ##############################################################################                ####################################            ##        ####              
      ##      ##  ############################################################          ##                            ####################################    ##########                      
        ##########################################################################                                                ########################################                    
        ########################################################################                                                    ####################  ##########                          
      ####    ##########      ####  ########################################      ####                                                ############################                            
    ####              ############  ##################################  ##        ####                                                  ########################                              
    ####              ############  ##################################  ##      ####                                                    ########################                              
      ########            ############################################      ######                                                      ######################                                
    ##################    ############################################    ####                                                            ##################                                  
  ################################  ##################################                                                                        ########                                        
  ########################  ##########      ########################                                                                            ######                                        
##################################            ####        ######                                                                                      ########                                
  ##############################                ##            ##                                                                                            ######                            
  ################################                                                                                                                            ############                    
              ##################                            ##  ####                                                                                          ##############                  
              ################                              ##                                                                                              ################                  
                ##########      ##                                    ################                                                                            ##############              
                  ######                                            ##################                                                                            ##########                  
                                                                              ########                                                                          ########                      
                                                                                                                                                                ##                            `;

const 世界地図行List = 世界地図の文字列.split("\n");

const 円の文字列 =
`                     ABCCDDDCCBA
                AABBCCCCDDDDDCCCCBBAA
            AAABBBCCCCCDDDDDDDCCCCCBBBAAA
         AAAABBBCCCCCCDDDDDDDDDCCCCCCBBBAAAA
      AAAAABBBBCCCCCCDDDDDDDDDDDCCCCCCBBBBAAAAA
    AAAAABBBBCCCCCCCDDDDDDDDDDDDDCCCCCCCBBBBAAAAA
   AAAABBBBCCCCCCCCDDDDDDDDDDDDDDDCCCCCCCCBBBBAAAA
  AAAABBBBBCCCCCCCCDDDDDDDDDDDDDDDCCCCCCCCBBBBBAAAA
 AAAABBBBBCCCCCCCCDDDDDDDDDDDDDDDDDCCCCCCCCBBBBBAAAA
 AAAABBBBBCCCCCCCCDDDDDDDDDDDDDDDDDCCCCCCCCBBBBBAAAA
AAAABBBBBCCCCCCCCDDDDDDDDDDDDDDDDDDDCCCCCCCCBBBBBAAAA
AAAABBBBBCCCCCCCCDDDDDDDDDDDDDDDDDDDCCCCCCCCBBBBBAAAA
AAAABBBBBCCCCCCCCDDDDDDDDDDDDDDDDDDDCCCCCCCCBBBBBAAAA
 AAAABBBBBCCCCCCCCDDDDDDDDDDDDDDDDDCCCCCCCCBBBBBAAAA
 AAAABBBBBCCCCCCCCDDDDDDDDDDDDDDDDDCCCCCCCCBBBBBAAAA
  AAAABBBBBCCCCCCCCDDDDDDDDDDDDDDDCCCCCCCCBBBBBAAAA
   AAAABBBBCCCCCCCCDDDDDDDDDDDDDDDCCCCCCCCBBBBAAAA
    AAAAABBBBCCCCCCCDDDDDDDDDDDDDCCCCCCCBBBBAAAAA
      AAAAABBBBCCCCCCDDDDDDDDDDDCCCCCCBBBBAAAAA
         AAAABBBCCCCCCDDDDDDDDDCCCCCCBBBAAAA
            AAABBBCCCCCDDDDDDDCCCCCBBBAAA
                AABBCCCCDDDDDCCCCBBAA
                     ABCCDDDCCBA`;

const 円行List = 円の文字列.split("\n").map(円行 => 円行.trim());;
const 円行文字数List = 円行List.map(円行 => 円行.length);

if (世界地図行List.length !== 円行文字数List.length) {
    throw new Error("んにゃぴ");
}
if (円行文字数List.some(円行文字数 => 円行文字数 % 2 === 0)) {
    throw new Error("んにゃぴ");
}

let 円行文字数_最大 = 0;
let 円行比率_基準 = [];
const 円行比率List = [];

for (const 円行 of 円行List) {
    const 円行比率 = [];
    let 数えている文字 = 円行[0];
    let count = 0;
    for (const 文字 of 円行) {
        if (文字 === 数えている文字) {
            count++;
        }
        else {
            円行比率.push(count);
            数えている文字 = 文字;
            count = 1;
        }
    }
    円行比率.push(count);
    円行比率List.push(円行比率);

    if (円行.length > 円行文字数_最大) {
        円行文字数_最大 = 円行.length;
        円行比率_基準 = 円行比率;
    }
}

const 円行比率_基準内の最大値 = Math.max(...円行比率_基準);
const 世界地図のコピー時の文字数 = 円行比率_基準内の最大値 * 円行比率_基準.length;





