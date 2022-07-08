import { useLPHistory, usePlayer } from "./helper";
import { renderHook, act } from '@testing-library/react-hooks';

describe('useLPHistory', () => {

  it('初期状態', () => {
    const { result } = renderHook(() => useLPHistory());
    expect(result.current.lpHistory.logs.length).toEqual(0);
    expect(result.current.lpHistory.head).toEqual(-1);
  });

  describe('addLog', () => {
    it('履歴が空の状態でログ追加', () => {
      const { result } = renderHook(() => useLPHistory());
      act(() => {
        result.current.ctl.addLog(0, 8000, 7000)
      });
      expect(result.current.lpHistory.logs.length).toEqual(1);
      expect(result.current.lpHistory.logs[0]).toEqual({playerID: 0, from: 8000, to: 7000});
      expect(result.current.lpHistory.head).toEqual(0);
    });
    it('異なるプレイヤーに対するログ追加', () => {
      const { result } = renderHook(() => useLPHistory());
      act(() => {
        result.current.ctl.addLog(0, 8000, 7000)
      });
      act(() => {
        result.current.ctl.addLog(1, 8000, 9000)
      });
      expect(result.current.lpHistory.logs.length).toEqual(2);
      expect(result.current.lpHistory.logs[1]).toEqual({playerID: 1, from: 8000, to: 9000});
      expect(result.current.lpHistory.head).toEqual(1);
    });
    it('headが先頭でない状態でログ追加すると上書きされる', () => {
      const { result } = renderHook(() => useLPHistory());
      act(() => {
        result.current.ctl.addLog(0, 8000, 7000)
      });
      act(() => {
        result.current.ctl.addLog(1, 8000, 9000)
      });
      act(() => {
        result.current.ctl.undo();
      });
      expect(result.current.lpHistory.logs.length).toEqual(2);
      expect(result.current.lpHistory.head).toEqual(0);
      act(() => {
        result.current.ctl.addLog(1, 8000, 10000)
      });
      expect(result.current.lpHistory.logs.length).toEqual(2);
      expect(result.current.lpHistory.logs[1]).toEqual({playerID: 1, from: 8000, to: 10000});
      expect(result.current.lpHistory.head).toEqual(1);
    });
  });
})

describe('usePlayer', () => {
  const decks = ['旋風BF', '代行天使'];
  const historyCtl = {
    addLog: jest.fn(),
    undo: jest.fn(),
    redo: jest.fn(),
    reset: jest.fn()
  };
  const showSaveModal = jest.fn();

  it('初期状態', () => {
    const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
    expect(result.current.player).toEqual({
      id: 0,
      lp: 8000,
      deck: decks[0],
      mode: 'normal',
      buf: 0
    })
  });

  describe('setDeck', () => {
    it('異なるデッキに変更', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      expect(result.current.player.deck).toEqual("旋風BF");
      act(() => {
        result.current.ctl.setDeck("代行天使");
      })
      expect(result.current.player.deck).toEqual("代行天使");
    });
    it('同じデッキに変更', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      expect(result.current.player.deck).toEqual("旋風BF");
      act(() => {
        result.current.ctl.setDeck("旋風BF");
      })
      expect(result.current.player.deck).toEqual("旋風BF");
    });
  });

  describe('addLP', () => {
    it('LP減算', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      expect(result.current.player.lp).toEqual(8000);
      act(() => {
        result.current.ctl.addLP(-1000);
      })
      expect(result.current.player.lp).toEqual(7000);
      expect(historyCtl.addLog.mock.calls[0]).toEqual([0, 8000, 7000])
    });
    it('巨大なダメージを受けても0で留まる', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.addLP(-100000);
      })
      expect(result.current.player.lp).toEqual(0);
      expect(historyCtl.addLog.mock.calls[0]).toEqual([0, 8000, 0])
    });
    it('LPが0になるとSaveModalを表示', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.addLP(-8000);
      })
      expect(result.current.player.lp).toEqual(0);
      expect(showSaveModal.call.length).toEqual(1);
    });
    it('LP加算', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      expect(result.current.player.lp).toEqual(8000);
      act(() => {
        result.current.ctl.addLP(1000);
      })
      expect(result.current.player.lp).toEqual(9000);
      expect(historyCtl.addLog.mock.calls[0]).toEqual([0, 8000, 9000])
    });
    it('大きな値も加算可能', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      expect(result.current.player.lp).toEqual(8000);
      act(() => {
        result.current.ctl.addLP(100000);
      })
      expect(result.current.player.lp).toEqual(108000);
      expect(historyCtl.addLog.mock.calls[0]).toEqual([0, 8000, 108000])
    });
    it('+0', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      expect(result.current.player.lp).toEqual(8000);
      act(() => {
        result.current.ctl.addLP(0);
      })
      expect(result.current.player.lp).toEqual(8000);
      expect(historyCtl.addLog.mock.calls[0]).toEqual([0, 8000, 8000])
    });
    it('複数回LP変動させる', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      expect(result.current.player.lp).toEqual(8000);
      act(() => {
        result.current.ctl.addLP(-2000);
      })
      expect(result.current.player.lp).toEqual(6000);
      act(() => {
        result.current.ctl.addLP(1000);
      })
      expect(result.current.player.lp).toEqual(7000);
      act(() => {
        result.current.ctl.addLP(-3000);
      })
      expect(result.current.player.lp).toEqual(4000);
      expect(historyCtl.addLog.mock.calls.length).toEqual(3)
      expect(historyCtl.addLog.mock.calls[0]).toEqual([0, 8000, 6000])
      expect(historyCtl.addLog.mock.calls[1]).toEqual([0, 6000, 7000])
      expect(historyCtl.addLog.mock.calls[2]).toEqual([0, 7000, 4000])
    });
  });

  describe('halfLP', () => {
    it('LP半分', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      expect(result.current.player.lp).toEqual(8000);
      act(() => {
        result.current.ctl.halfLP();
      });
      expect(result.current.player.lp).toEqual(4000);
    });
    it('LPが奇数の場合、半減後のLPは切り上げ', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.addLP(-1);
      });
      expect(result.current.player.lp).toEqual(7999);
      act(() => {
        result.current.ctl.halfLP();
      });
      expect(result.current.player.lp).toEqual(4000);
    });
    it('LPが1の場合、半減後のLPも1', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.addLP(-7999);
      });
      expect(result.current.player.lp).toEqual(1);
      act(() => {
        result.current.ctl.halfLP();
      });
      expect(result.current.player.lp).toEqual(1);
    });
  });

  describe('undoLP', () => {
    it('LP減算後のundo', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.addLP(-3000);
      });
      expect(result.current.player.lp).toEqual(5000);
      act(() => {
        result.current.ctl.undoLP({playerID: 0, from: 8000, to: 5000});
      });
      expect(result.current.player.lp).toEqual(8000);
    });
    it('プレイヤーidが異なる場合はundoされない', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.addLP(-3000);
      });
      expect(result.current.player.lp).toEqual(5000);
      act(() => {
        result.current.ctl.undoLP({playerID: 1, from: 8000, to: 5000});
      });
      expect(result.current.player.lp).toEqual(5000);
    });
  });

  describe('redoLP', () => {
    it('undo後のredo', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.addLP(-3000);
      });
      act(() => {
        result.current.ctl.undoLP({playerID: 0, from: 8000, to: 5000});
      })
      expect(result.current.player.lp).toEqual(8000);
      act(() => {
        result.current.ctl.redoLP({playerID: 0, from: 8000, to: 5000});
      });
      expect(result.current.player.lp).toEqual(5000);
    });
    it('プレイヤーidが異なる場合はredoされない', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.addLP(-3000);
      });
      act(() => {
        result.current.ctl.undoLP({playerID: 0, from: 8000, to: 5000});
      })
      expect(result.current.player.lp).toEqual(8000);
      act(() => {
        result.current.ctl.redoLP({playerID: 1, from: 8000, to: 5000});
      });
      expect(result.current.player.lp).toEqual(8000);
    });
  });

  describe('reset', () => {
    it('resetしてもデッキは変わらない', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.setDeck("代行天使");
      });
      act(() => {
        result.current.ctl.addLP(-3000);
      });
      act(() => {
        result.current.ctl.changeMode("+");
      });
      act(() => {
        result.current.ctl.pushKey("9");
      });
      expect(result.current.player).toEqual({
        id: 0,
        lp: 5000,
        deck: '代行天使',
        mode: '+',
        buf: 9
      });
      act(() => {
        result.current.ctl.reset();
      });
      expect(result.current.player).toEqual({
        id: 0,
        lp: 8000,
        deck: '代行天使',
        mode: 'normal',
        buf: 0
      });
    });
    it('初期状態のままreset', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.reset();
      });
      expect(result.current.player).toEqual({
        id: 0,
        lp: 8000,
        deck: decks[0],
        mode: 'normal',
        buf: 0
      });
    });
  });

  describe('changeMode', () => {
    it('normalから+に遷移', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('+');
      });
      expect(result.current.player.mode).toEqual('+');
    });
    it('normalから-に遷移', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('-');
      });
      expect(result.current.player.mode).toEqual('-');
    });
    it('+から-に遷移（バッファの値は引き継がれる）', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('+');
      });
      act(() => {
        result.current.ctl.pushKey('2');
      });
      act(() => {
        result.current.ctl.pushKey('00');
      });
      act(() => {
        result.current.ctl.changeMode('-');
      });
      expect(result.current.player.mode).toEqual('-');
      expect(result.current.player.buf).toEqual(200);
    });
    it('-から+に遷移（バッファの値は引き継がれる）', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('-');
      });
      act(() => {
        result.current.ctl.pushKey('2');
      });
      act(() => {
        result.current.ctl.pushKey('00');
      });
      act(() => {
        result.current.ctl.changeMode('+');
      });
      expect(result.current.player.mode).toEqual('+');
      expect(result.current.player.buf).toEqual(200);
    });
    it('+からnormalに遷移（バッファの値はクリアされる）', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('+');
      });
      act(() => {
        result.current.ctl.pushKey('2');
      });
      act(() => {
        result.current.ctl.pushKey('00');
      });
      act(() => {
        result.current.ctl.changeMode('normal');
      });
      expect(result.current.player.mode).toEqual('normal');
      expect(result.current.player.buf).toEqual(0);
    });
    it('-からnormalに遷移（バッファの値はクリアされる）', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('-');
      });
      act(() => {
        result.current.ctl.pushKey('2');
      });
      act(() => {
        result.current.ctl.pushKey('00');
      });
      act(() => {
        result.current.ctl.changeMode('normal');
      });
      expect(result.current.player.mode).toEqual('normal');
      expect(result.current.player.buf).toEqual(0);
    });
  });

  describe('pushKey', () => {
    it('buf=0で0以外の整数をpushするとbufはその整数になる', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('+');
      });
      expect(result.current.player.buf).toEqual(0);
      act(() => {
        result.current.ctl.pushKey('1')
      });
      expect(result.current.player.buf).toEqual(1);
    });
    it('buf=0で0をpushするとbufは0のまま', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('+');
      });
      expect(result.current.player.buf).toEqual(0);
      act(() => {
        result.current.ctl.pushKey('0')
      });
      expect(result.current.player.buf).toEqual(0);
    });
    it('buf=0で00をpushするとbufは0のまま', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('+');
      });
      expect(result.current.player.buf).toEqual(0);
      act(() => {
        result.current.ctl.pushKey('00')
      });
      expect(result.current.player.buf).toEqual(0);
    });
    it('buf!=0で整数をpushするとbufの末尾にそれが追加される', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('+');
      });
      act(() => {
        result.current.ctl.pushKey('4');
      });
      act(() => {
        result.current.ctl.pushKey('2');
      });
      expect(result.current.player.buf).toEqual(42);
      act(() => {
        result.current.ctl.pushKey('0')
      });
      expect(result.current.player.buf).toEqual(420);
    });
    it('buf!=0で00をpushするとbufが100倍される', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('+');
      });
      act(() => {
        result.current.ctl.pushKey('4');
      });
      act(() => {
        result.current.ctl.pushKey('2');
      });
      expect(result.current.player.buf).toEqual(42);
      act(() => {
        result.current.ctl.pushKey('00')
      });
      expect(result.current.player.buf).toEqual(4200);
    });
    it('+モードの状態で=をpushするとbufがLPに加算されnormalモードに戻る', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('+');
      });
      act(() => {
        result.current.ctl.pushKey('4');
      });
      act(() => {
        result.current.ctl.pushKey('2');
      });
      expect(result.current.player.lp).toEqual(8000);
      expect(result.current.player.buf).toEqual(42);
      act(() => {
        result.current.ctl.pushKey('=')
      });
      expect(result.current.player.lp).toEqual(8042);
      expect(result.current.player.buf).toEqual(0);
      expect(result.current.player.mode).toEqual('normal');
      expect(historyCtl.addLog.mock.calls[0]).toEqual([0, 8000, 8042])
    });
    it('-モードの状態で=をpushするとbufがLPに減算されnormalモードに戻る', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('-');
      });
      act(() => {
        result.current.ctl.pushKey('4');
      });
      act(() => {
        result.current.ctl.pushKey('2');
      });
      expect(result.current.player.lp).toEqual(8000);
      expect(result.current.player.buf).toEqual(42);
      act(() => {
        result.current.ctl.pushKey('=')
      });
      expect(result.current.player.lp).toEqual(7958);
      expect(result.current.player.buf).toEqual(0);
      expect(result.current.player.mode).toEqual('normal');
      expect(historyCtl.addLog.mock.calls[0]).toEqual([0, 8000, 7958])
    });
    it('-モードの状態で=をpushした場合もLPは0未満にならない', () => {
      const { result } = renderHook(() => usePlayer(0, decks, historyCtl, showSaveModal));
      act(() => {
        result.current.ctl.changeMode('-');
      });
      act(() => {
        result.current.ctl.pushKey('9');
      });
      act(() => {
        result.current.ctl.pushKey('00');
      });
      act(() => {
        result.current.ctl.pushKey('8');
      });
      expect(result.current.player.lp).toEqual(8000);
      expect(result.current.player.buf).toEqual(9008);
      act(() => {
        result.current.ctl.pushKey('=')
      });
      expect(result.current.player.lp).toEqual(0);
      expect(result.current.player.buf).toEqual(0);
      expect(result.current.player.mode).toEqual('normal');
      expect(historyCtl.addLog.mock.calls[0]).toEqual([0, 8000, 0])
    });
  });
});
