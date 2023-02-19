#!/usr/bin/env node

import { weatherConstants } from "./constants/weather.constants.js";
import { getArgs } from "./helpers/arg.js";
import {
  printHelp,
  printError,
  printSuccess,
  printInfo,
} from "./services/log.service.js";
import { saveKeyValue, getKeyValue } from "./services/storage.service.js";
import { checker } from "./helpers/checker.js";

const initCLI = async () => {
  const args = getArgs(process.argv);

  const saveData = async (data) => {
    if (data) {
        try {
            await saveKeyValue(data)
            printSuccess(`${Object.keys(data).join(', ')} - has written success`);
        } catch (error) {
            printError(error);
        }
    }
    checker(data);
  };

  switch (true) {
    case args.h: {
      printHelp();
      break;
    }
    case !!args.t && Object.keys(args).length <= 1: {
      await saveData({ token: args.t });
      break;
    }
    case !!args.c && Object.keys(args).length <= 1: {
      await saveData({ city: args.c });
      break;
    }
    case !!args.c && !!args.t && Object.keys(args).length == 2: {
      await saveData({ city: args.c, token: args.t });
      break;
    }
    default:
      await checker();
      return;
  }
};

initCLI();
