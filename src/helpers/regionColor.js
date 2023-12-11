

  function regionColor(region) {
        switch (region) {
            case 'Europe':
                return 'europe';
            case 'Africa':
                return 'africa';
            case 'Asia':
                return 'asia';
            case 'Americas':
                return 'americas';
            case 'Oceania':
                return 'oceania';
            default:
                return 'unknown';
        }
    }

    export default regionColor;