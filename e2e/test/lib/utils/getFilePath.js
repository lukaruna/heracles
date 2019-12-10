const path = require('path')

const FILE_EXTENSION_REGEX = /\.[0-9a-z]+$/i

/**
 * Resolves the given path into a absolute path and appends the default filename as fallback when the provided path is a directory.
 * @param  {String} logPath         relative file or directory path
 * @param  {String} defaultFilename default file name when filePath is a directory
 * @return {String}                 absolute file path
 */
module.exports = function getFilePath(filePath, defaultFilename) {
  let absolutePath = path.join(process.cwd(), filePath)

  if (!FILE_EXTENSION_REGEX.test(path.basename(absolutePath))) {
    absolutePath = path.join(absolutePath, defaultFilename)
  }

  return absolutePath
}
