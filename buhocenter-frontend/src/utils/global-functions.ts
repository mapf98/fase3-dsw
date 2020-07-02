function getShortName(name: string, length: number) {
    return name!.length < length ? name : name!.substring(0, length)! + '...';
}

export { getShortName };
