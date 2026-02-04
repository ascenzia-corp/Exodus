// Exodus 90 Meditations Data
// Les méditations peuvent être ajoutées via la page admin.html

// Méditations par défaut (exemples)
const defaultMeditations = {
    1: {
        title: "Arrivée en Égypte",
        scripture: "Exode 1, 1-8",
        intro: "Frères, bienvenue au Jour 1 d'Exodus 90 2026.\n\nC'est notre grande joie de vous accueillir, peu importe qui vous êtes ou d'où vous venez, dans la fraternité Exodus 90 alors que nous commençons une nouvelle année. Notre fraternité s'étend à travers le monde. Nous sommes unis dans la prière et l'ascèse alors que nous nous efforçons de vivre d'une manière peu commune, une vie de liberté en Jésus-Christ.\n\nQu'est-ce qu'Exodus 90 vraiment ? Exodus 90 existe pour aider les hommes à devenir extraordinairement libres. La liberté, dans une vision catholique, est complètement différente des libertés que le monde nous offre. L'icône de la virilité, l'homme libre, c'est Jésus-Christ. Il nous montre, les bras étendus sur la Croix, à quoi ressemble la liberté.",
        openingPrayer: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.\n\nSouvenons-nous que nous sommes en la présence aimante de Dieu, qui est avec nous. Confiez dans la prière votre parcours Exodus à Lui aujourd'hui. Prenez une minute de silence maintenant, priant pour la bénédiction de Dieu sur vous, votre famille, votre fraternité et tous les hommes d'Exodus.\n\nNotre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour, pardonne-nous nos offenses comme nous pardonnons aussi à ceux qui nous ont offensés, et ne nous laisse pas entrer en tentation, mais délivre-nous du mal. Amen.",
        reading: "Voici les noms des fils d'Israël venus en Égypte avec Jacob, chacun avec sa famille : Ruben, Siméon, Lévi et Juda, Issacar, Zabulon et Benjamin, Dan et Nephtali, Gad et Asher. Le nombre total des personnes issues de Jacob était de soixante-dix. Joseph était déjà en Égypte. Puis Joseph mourut, ainsi que tous ses frères et toute cette génération. Mais les fils d'Israël furent féconds et prolifiques ; ils se multiplièrent et devinrent extrêmement forts, de sorte que le pays en fut rempli. Or un nouveau roi se leva sur l'Égypte, qui n'avait pas connu Joseph.",
        reflection: "Le Livre de l'Exode est une histoire de liberté, de la manière dont un peuple, les Hébreux, fut délivré par Dieu de l'esclavage en Égypte. L'Exode continue l'histoire de la Genèse, ce livre des origines qui raconte l'histoire de la création, la Chute de nos premiers parents dans le péché, l'appel de notre père Abraham, et la croissance de sa famille, le début de ses descendants qui seraient aussi nombreux que les étoiles.\n\nLes noms comptent dans la Bible, et les noms que nous lisons aujourd'hui racontent une histoire surprenante et sombre. Les versets d'ouverture de l'Exode nous rappellent comment Israël, le peuple élu de Dieu, est arrivé en Égypte en premier lieu. Notre Écriture aujourd'hui fait référence à un roi sans nom, qui, bien qu'il soit monté au pouvoir suprême, « n'avait pas connu Joseph ». Le nom de Joseph se détache nettement contre l'anonymat du souverain. Tout ce que nous savons du roi, c'est qu'il n'avait pas connu Joseph.\n\nQui est ce Joseph ? Son histoire nous situe en Égypte, nous montrant que Dieu a un plan pour permettre nos luttes précisément afin de les utiliser pour nous amener à la liberté. L'histoire de Joseph, cependant, commence en Canaan, la Terre Promise. Abraham était le père d'Isaac, et Isaac le père de Jacob. Jacob avait douze fils, qui sont ceux énumérés dans les versets d'ouverture. La Genèse nous dit que Jacob aimait particulièrement son fils Joseph, « parce qu'il était le fils de sa vieillesse ». Il lui fit une tunique à longues manches et multicolore, un vêtement pour refléter son amour.\n\nAujourd'hui, nous aussi sommes en Égypte. Comme les Israélites, nous avons besoin d'être libérés de nombreuses choses qui nous maintiennent liés dans une sorte d'esclavage moral ou spirituel. Aussi linéaires et parfaites que nous aimerions que nos vies soient, et que nous les projetons souvent aux autres, elles ne le sont pas. Nous venons tous de généalogies avec leurs propres histoires, notre existence étant liée et dépendante de ceux qui nous ont précédés.\n\nEt pourtant, Dieu prépare quelque chose de bon. Comme aux jours anciens, si nous persévérons dans l'amour de Dieu, comme saint Paul nous le rappelle, il fait concourir toutes choses au bien de ceux qui l'aiment. Il nous appelle à faire notre propre Exode au cours des quatre-vingt-dix prochains jours, brisant les liens des mauvaises habitudes et des occasions manquées pour entrer dans une relation plus profonde avec lui.",
        closingPrayer: "Père céleste, tu nous as donné Joseph comme exemple, lui qui peut s'identifier à notre souffrance et nous donne aussi une raison d'espérer en voyant comment tu l'as délivré. Ce que ses frères voulaient pour le mal, tu l'as voulu pour le bien. Aide-nous à avoir cette espérance alors que nous apportons toutes nos blessures dans cet Exodus 90. Aide-nous à faire confiance au pouvoir de ta providence. Nous te le demandons par le Christ notre Seigneur. Amen.\n\nAu nom du Père, et du Fils, et du Saint-Esprit. Amen."
    }
};

// Charger les méditations depuis localStorage ou utiliser les défauts
function loadMeditations() {
    const saved = localStorage.getItem('exodus90_meditations');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Erreur de parsing des méditations:', e);
        }
    }
    return defaultMeditations;
}

// Sauvegarder les méditations dans localStorage
function saveMeditations(data) {
    localStorage.setItem('exodus90_meditations', JSON.stringify(data));
}

// Ajouter ou mettre à jour une méditation
function saveMeditation(dayNum, meditation) {
    const meditations = loadMeditations();
    meditations[dayNum] = meditation;
    saveMeditations(meditations);
    window.meditations = meditations;
}

// Supprimer une méditation
function deleteMeditation(dayNum) {
    const meditations = loadMeditations();
    delete meditations[dayNum];
    saveMeditations(meditations);
    window.meditations = meditations;
}

// Exporter toutes les méditations en JSON
function exportMeditations() {
    return JSON.stringify(loadMeditations(), null, 2);
}

// Importer des méditations depuis JSON
function importMeditations(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        saveMeditations(data);
        window.meditations = data;
        return true;
    } catch (e) {
        console.error('Erreur d\'import:', e);
        return false;
    }
}

// Initialiser les méditations globales
window.meditations = loadMeditations();
