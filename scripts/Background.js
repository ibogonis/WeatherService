function changeBackground(cond) {
    switch (cond) {
        case "clear sky":
            document.body.background = "url('../pic/clear_sky.jpg') no-repeat;";
            break;
        case "light rain":
            document.body.background = "url('../pic/light_rain.jpg') no-repeat;";
            break;
        case "heavy intensity rain":
            document.body.background = "url('../pic/heavy_intensity_rain.jpg') no-repeat;";
            break;
    }
}
