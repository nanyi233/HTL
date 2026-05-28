const StorageManager = {
  STORAGE_KEY: 'uecpp_progress',

  _getDefaultProgress() {
    return {
      masteredRoots: [],
      currentRootIndex: 0,
      lastStudyDate: null
    };
  },

  _validateProgress(data) {
    return (
      data &&
      typeof data === 'object' &&
      Array.isArray(data.masteredRoots) &&
      typeof data.currentRootIndex === 'number'
    );
  },

  getProgress() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return this._getDefaultProgress();
      const parsed = JSON.parse(data);
      if (!this._validateProgress(parsed)) {
        console.warn('Invalid progress data, using default');
        return this._getDefaultProgress();
      }
      return parsed;
    } catch (error) {
      console.error('Failed to load progress:', error);
      return this._getDefaultProgress();
    }
  },

  _saveProgress(progress) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
      return true;
    } catch (error) {
      console.error('Failed to save progress:', error);
      return false;
    }
  },

  markRootAsMastered(rootId) {
    const progress = this.getProgress();
    if (!progress.masteredRoots.includes(rootId)) {
      progress.masteredRoots.push(rootId);
      progress.lastStudyDate = new Date().toISOString();
      this._saveProgress(progress);
    }
    return progress;
  },

  unmarkRootAsMastered(rootId) {
    const progress = this.getProgress();
    progress.masteredRoots = progress.masteredRoots.filter(id => id !== rootId);
    this._saveProgress(progress);
    return progress;
  },

  updateProgress(rootIndex) {
    const progress = this.getProgress();
    progress.currentRootIndex = rootIndex;
    progress.lastStudyDate = new Date().toISOString();
    this._saveProgress(progress);
    return progress;
  },

  isMastered(rootId) {
    const progress = this.getProgress();
    return progress.masteredRoots.includes(rootId);
  },

  resetProgress() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to reset progress:', error);
      return false;
    }
  }
};
