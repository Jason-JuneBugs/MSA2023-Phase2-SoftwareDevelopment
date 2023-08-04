export default function findResults(target){
    let target_id;
    switch (target) {
        case 'Kepler-1649 b':
          target_id = 1;
          break;
        case 'Kepler-62 f':
          target_id = 2;
          break;
        case 'Kepler-452 b':
          target_id = 3;
          break;
        case 'Kepler-296 A e':
          target_id = 4;
          break;
        case 'Kepler-296 A f':
          target_id = 5;
          break;
        case 'Kepler-442 b':
          target_id = 6;
          break;
        case 'Kepler-1410 b':
          target_id = 7;
          break;
        case 'Kepler-1652 b':
          target_id = 8;
          break;
        default:
          target_id = null;  
          break;
      }
      return target_id
}