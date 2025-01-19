
const 世界地図の文字列 = 
`#                                                                             ####     ####
##         ##                    #                                         ####  ##########
#                        ######################                     ####  # #####    ######
          ## #######################################     ##################      #    ##   
      #   # ##############################     #                 ############  #####       
       #####################################                       ##################      
       ####################################                        ######### #####         
      ##  #####   ## ####################   ##                     ##############          
     ##       ###### ################# #    ##                      ############           
     ##       ###### ################# #   ##                       ############           
      ####      ######################   ###                        ###########            
     #########  ######################  ##                           #########             
    ################ #################                                 ###                 
    ############ #####   ############                                   ##                 
   #################      ##    ###                                        ##              
    ###############        #      #                                             #          
    ################                                                           #####       
          #########              # ##                                          #######     
          ########               #                                            ########     
           #####   #                  #######                                    #######   
            ###                      #########                                   #####     
                                           ##                                   ####       
                                                                                #          `;

const 世界地図行List = 世界地図の文字列.split("\n");

let 世界地図基準列 = 0;
const 世界地図基準列_最大 = 世界地図行List[0].length - 1;

const 円行文字数List = [10, 20, 28, 34, 40, 44, 46, 49, 51, 51, 53, 53, 53, 51, 51, 49, 46, 44, 40, 34, 28, 20, 10];
const 最大幅 = Math.max(...円行文字数List);

if (世界地図行List.length !== 円行文字数List.length) {
    throw new Error("んにゃぴ");
}
if (世界地図行List[0].length < 最大幅) {
    throw new Error("んにゃぴ");
}

// setInterval(() => {
//     描画();
//     世界地図基準列 = (世界地図基準列 + 1) % 世界地図基準列_最大;
// }, 100);

// debug
描画();

function 描画() {
    console.clear();
    for (let i = 0; i < 世界地図行List.length; i++) {
        const 世界地図行 = 世界地図行List[i];
        const 円行文字数 = 円行文字数List[i];
        const 世界地図行の一部 = (世界地図行 + 世界地図行).slice(世界地図基準列, 世界地図基準列 + 最大幅);
        const 歪んだ世界地図の一部 = 歪んだ世界地図行を作る(世界地図行の一部, 円行文字数);
        const 宇宙空間 = "#".repeat(Math.floor((最大幅 - 円行文字数) / 2));
        // console.log(世界地図行の一部);
        // console.log(歪んだ世界地図の一部);
        console.log(宇宙空間 + "@" + 歪んだ世界地図の一部 + "@" + 宇宙空間);
        // if (歪んだ世界地図の一部.length !== 円行文字数) {
        //     throw new Error("aaa")
        // }
    }
}

function 歪んだ世界地図行を作る(世界地図行, 円行文字数) {
    let カウントしている文字 = 世界地図行[0];
    let count = 0;
    const rle = [];
    for (const 世界地図行の文字 of 世界地図行) {
        if (世界地図行の文字 === カウントしている文字) {
            count++;
        }
        else {
            rle.push(count);
            カウントしている文字 = カウントしている文字 === " " ? "#" : " ";
            count = 1;
        }
    }
    rle.push(count);

    let 歪んだ世界地図行 = "";
    let 書く文字 = 世界地図行[0];
    for (const 文字数 of rle) {
        const 書く文字数 = Math.max(Math.floor(文字数 * (円行文字数 / 最大幅)), 1);
        歪んだ世界地図行 += 書く文字.repeat(書く文字数);
        書く文字 = 書く文字 === " " ? "#" : " ";
    }

    if (歪んだ世界地図行.length < 円行文字数) {
        return 歪んだ世界地図行 + 歪んだ世界地図行.at(-1).repeat(円行文字数 - 歪んだ世界地図行.length);
    }
    else if (歪んだ世界地図行.length > 円行文字数) {
        return 歪んだ世界地図行.slice(0, 円行文字数);
    }
    else {
        return 歪んだ世界地図行;
    }
}
