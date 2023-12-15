function simplifyDebts(
  transactions: Record<string, number>
): Array<[string, string, number]> {
  const splits: Array<[string, string, number]> = [];
  const transactionMap = new Map(Object.entries(transactions)); // converting JSON to map object

  function settleSimilarFigures() {
    const vis = new Map<string, number>();
    for (const tr1 of transactionMap.keys()) {
      vis.set(tr1, 1);
      for (const tr2 of transactionMap.keys()) {
        if (!vis.has(tr2) && tr1 !== tr2) {
          if (transactionMap.get(tr2) === -transactionMap.get(tr1)!) {
            if (transactionMap.get(tr2)! > transactionMap.get(tr1)!) {
              splits.push([tr1, tr2, transactionMap.get(tr2)!]);
            } else {
              splits.push([tr2, tr1, transactionMap.get(tr1)!]);
            }
            transactionMap.set(tr2, 0);
            transactionMap.set(tr1, 0);
          }
        }
      }
    }
  }

  function getMaxMinCredit(): [string | undefined, string | undefined] {
    let maxOb: string | undefined,
      minOb: string | undefined,
      max = Number.MIN_VALUE,
      min = Number.MAX_VALUE;
    for (const tr of transactionMap.keys()) {
      if (transactionMap.get(tr)! < min) {
        min = transactionMap.get(tr)!;
        minOb = tr;
      }
      if (transactionMap.get(tr)! > max) {
        max = transactionMap.get(tr)!;
        maxOb = tr;
      }
    }
    return [minOb, maxOb];
  }

  function helper() {
    const minMax = getMaxMinCredit();
    if (minMax[0] === undefined || minMax[1] === undefined) return;
    let minValue = Math.min(
      -transactionMap.get(minMax[0])!,
      transactionMap.get(minMax[1])!
    );
    transactionMap.set(minMax[0]!, transactionMap.get(minMax[0])! + minValue);
    transactionMap.set(minMax[1]!, transactionMap.get(minMax[1])! - minValue);
    minValue = Math.round((minValue + Number.EPSILON) * 100) / 100;
    const res: [string, string, number] = [minMax[0]!, minMax[1]!, minValue];
    splits.push(res);
    helper();
  }

  settleSimilarFigures();
  helper();

  return splits;
}

export default simplifyDebts;
