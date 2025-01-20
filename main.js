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

if (円行比率List.some(円行比率 => 円行比率.length !== 円行比率_基準.length)) {
    throw new Error("んにゃぴ");
}

const 円行比率_基準内の最大値 = Math.max(...円行比率_基準);
const 世界地図のコピー時の文字数 = 円行比率_基準内の最大値 * 円行比率_基準.length;

let 世界地図基準列 = 0;
const 世界地図基準列_最大 = 世界地図行List[0].length;

setInterval(() => {
    描画();
    世界地図基準列 = (世界地図基準列 + 世界地図基準列_最大 - 1) % 世界地図基準列_最大;
}, 80);

function 描画() {
    console.clear();
    for (let i = 0; i < 世界地図行List.length; i++) {
        const 世界地図行 = 世界地図行List[i];
        const 円行比率 = 円行比率List[i];
        const 世界地図行の一部 = (世界地図行 + 世界地図行).slice(世界地図基準列, 世界地図基準列 + 世界地図のコピー時の文字数);
        const 世界地図行の一部の分割文字列List = [];
        for (let i = 0; i < 世界地図行の一部.length; i += 円行比率_基準内の最大値) {
            世界地図行の一部の分割文字列List.push(世界地図行の一部.slice(i, i + 円行比率_基準内の最大値));
        }
        
        let 地球行の一部 = "";

        for (let i = 0; i < 円行比率.length; i++) {
            const 円行の一部の文字数 = 円行比率[i];
            const 世界地図行の一部の分割文字列 = 世界地図行の一部の分割文字列List[i];
            const 削除する文字数 = 円行比率_基準内の最大値 - 円行の一部の文字数;
            if (世界地図行の一部の分割文字列.length < 削除する文字数) {
                throw new Error("んにゃぴ");
            }
            let 円行の一部の文字列 = "";
            if (削除する文字数 === 0) {
                円行の一部の文字列 = 世界地図行の一部の分割文字列;
            }
            else {
                const 文字を削除する間隔 = Math.ceil(世界地図行の一部の分割文字列.length / 削除する文字数);
                for (let i = 0; i < 世界地図行の一部の分割文字列.length; i += 文字を削除する間隔) {
                    const 削除処理を入れる文字列 = 世界地図行の一部の分割文字列.slice(i, i + 文字を削除する間隔);
                    const center = Math.floor(削除処理を入れる文字列.length / 2);
                    円行の一部の文字列 += 削除処理を入れる文字列.slice(0, center) + 削除処理を入れる文字列.slice(center + 1);
                }
            }
            if (円行の一部の文字列.length > 円行の一部の文字数) {
                const さらに削除する文字数 = 円行の一部の文字列.length - 円行の一部の文字数;
                if (i < 円行比率.length / 2) {
                    円行の一部の文字列 = 円行の一部の文字列.slice(さらに削除する文字数);
                }
                else {
                    円行の一部の文字列 = 円行の一部の文字列.slice(0, -さらに削除する文字数);
                }
            }
            if (円行の一部の文字列.length !== 円行の一部の文字数) {
                throw new Error("んにゃぴ");
            }
            地球行の一部 += 円行の一部の文字列;
        }

        const 宇宙 = "#".repeat((円行文字数_最大 - 円行文字数List[i]) / 2);
        console.log(宇宙 + " " + 地球行の一部 + " " + 宇宙);
    }
}
