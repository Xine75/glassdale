//Creates HTML formatting for JavaScript info

export const Criminal = (criminal) => {
    return `
        <article class="criminals">
            <h1>${criminal.name}</h1>
            <div class="criminals__age">Age: ${criminal.age}</div>
            <div class="criminals__crime">Crime: ${criminal.conviction}</div>
            <div class="criminals__term__start">Term Start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}
            </div>
            <div class="criminals__term__end">Term End: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}
            </div>
          
        </article>
    `
}