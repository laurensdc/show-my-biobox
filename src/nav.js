/**
 * Take in array of filenames and return a <nav> element with links to those files
 *  
 * @returns links with bioboxes of last 3 weeks
 */
export const getNavElement = (fileNames, today) => {

  // Only use files of last 21 days, files are in the format of YYYY-MM-dd.html
  const filesOfLast7Days = fileNames.filter(file => {
    const date = new Date(file.replace(/\.html$/, ''));
    const now = new Date(today);
    const diff = Math.abs(now - date);
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays <= 21;
  });

  // Sort chronologically
  filesOfLast7Days.sort((a, b) => {
    const dateA = new Date(a.replace(/\.html$/, ''));
    const dateB = new Date(b.replace(/\.html$/, ''));
    return dateB - dateA;
  });

  let nav = '<ul>';
  filesOfLast7Days.forEach(file => {
    const removeDotHtml = file.replace(/\.html$/, '');
    nav += `<li><a href="/${file}">${removeDotHtml}</a></li> `;
  });

  nav += '</ul>';

  return nav;
};
